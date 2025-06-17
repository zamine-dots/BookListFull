import React, { useContext, createContext, useState, useEffect } from 'react';
import { account, databases } from '../lib/appwrite';
import { ID, Query } from 'appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(userInfo.email, userInfo.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        `${userInfo.name} ${userInfo.surname}`
      );

      await account.createEmailPasswordSession(userInfo.email, userInfo.password1);
      const accountDetails = await account.get();
      setUser(accountDetails);

      // Add to users collection
      await databases.createDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_COLLECTION_Users_ID,
        ID.unique(),
        {
          email: userInfo.email,
          fullName: `${userInfo.name} ${userInfo.surname}`,
        }
      );
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      setUser(null); // not logged in
    } finally {
      setLoading(false);
    }
  };

  const getFavBooks = async () => {
    try {
      const accountDetails = await account.get();
      const userID = accountDetails.$id;

      const result = await databases.listDocuments(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_COLLECTION_Favbooks_ID,
        [Query.equal('UserID', userID)]
      );
      return result.documents;
    } catch (error) {
      console.error('Fetching favorite books failed:', error);
      return [];
    }
  };

  const addfavbook = async (bookInfo, heart) => {
    try {
      const accountDetails = await account.get();
      const userID = accountDetails.$id;

      const response = await databases.listDocuments(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_COLLECTION_Favbooks_ID,
        [Query.equal('UserID', userID), Query.equal('coverUrl', bookInfo.coverUrl)]
      );

      if (heart && response.documents.length === 0) {
        await databases.createDocument(
          import.meta.env.VITE_DB_ID,
          import.meta.env.VITE_COLLECTION_Favbooks_ID,
          ID.unique(),
          {
            UserID: userID,
            coverUrl: bookInfo.coverUrl,
            bookTitle: bookInfo.title,
            bookAuther: bookInfo.author || 'Unknown',
          }
        );
      } else if (!heart && response.documents.length > 0) {
        const docId = response.documents[0].$id;

        await databases.deleteDocument(
          import.meta.env.VITE_DB_ID,
          import.meta.env.VITE_COLLECTION_Favbooks_ID,
          docId
        );

        console.log('Book removed from favorites.');
      }
    } catch (error) {
      console.error('addfavbook error:', error);
    }
  };

  const contextValue = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    addfavbook,
    getFavBooks,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
