import { auth, db, googleProvider } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const dbService = {
  // Kullanıcı Kayıt (Register)
  register: async (email, password, companyName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const initialData = {
        companyName,
        email,
        createdAt: new Date().toISOString(),
        dataEntry: null,
        analyzedData: null,
        supplyChain: [],
        wallet: {
           balance: 0,
           credits: []
        }
      };
      
      await setDoc(doc(db, "users", user.uid), initialData);
      
      return { user: { id: user.uid, email, companyName } };
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Bu e-posta adresi ile kayıtlı bir hesap zaten var.');
      }
      throw new Error(error.message);
    }
  },

  // E-posta ile Giriş (Login)
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { user: { id: user.uid, email: user.email } };
    } catch (error) {
      throw new Error('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
    }
  },

  // Google ile Giriş/Kayıt
  loginWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Kullanıcının Firestore'da verisi var mı kontrol et
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        // İlk kez giriyorsa varsayılan verileri oluştur
        const initialData = {
          companyName: user.displayName || "Google Kullanıcısı",
          email: user.email,
          createdAt: new Date().toISOString(),
          dataEntry: null,
          analyzedData: null,
          supplyChain: [],
          wallet: {
             balance: 0,
             credits: []
          }
        };
        await setDoc(docRef, initialData);
      }
      
      return { user: { id: user.uid, email: user.email } };
    } catch (error) {
      throw new Error('Google ile giriş yapılamadı.');
    }
  },

  // Kullanıcının verilerini getir
  getUserData: async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      return null;
    }
  },

  // Kullanıcının verilerini kaydet
  saveUserData: async (userId, data) => {
    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, data);
      return { success: true };
    } catch (error) {
      console.error("Veri kaydetme hatası:", error);
      // Eğer updateDoc başarısız olursa (döküman yoksa), setDoc ile oluştur
      try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, data, { merge: true });
        return { success: true };
      } catch (innerError) {
         throw new Error("Veriler kaydedilemedi.");
      }
    }
  },

  // E-Posta var mı kontrol et
  checkEmailExists: async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return { exists: methods.length > 0 };
    } catch (error) {
      return { exists: false };
    }
  },

  // Şifre Sıfırlama
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      throw new Error('Şifre sıfırlama e-postası gönderilemedi.');
    }
  }
};
