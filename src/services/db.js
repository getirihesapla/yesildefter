/**
 * SaaS Database Simulator (Mock Cloud DB)
 * Bu servis gerçek bir Firebase/Supabase veritabanını simüle eder.
 * Verileri localStorage üzerinde tutarak kalıcı hale getirir ve
 * ileride gerçek bir API'ye geçişi kolaylaştırır.
 */

// Sisteme kayıtlı kullanıcıların (firmaların) listesini getir
const getUsers = () => {
  const users = localStorage.getItem('saas_users');
  return users ? JSON.parse(users) : [];
};

// Sistemi kaydeden kullanıcıları güncelle
const saveUsers = (users) => {
  localStorage.setItem('saas_users', JSON.stringify(users));
};

export const dbService = {
  // Kullanıcı Kayıt (Register)
  register: async (email, password, companyName) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        if (users.find(u => u.email === email)) {
          reject(new Error('Bu e-posta adresi ile kayıtlı bir firma zaten var.'));
          return;
        }

        const newUser = {
          id: 'user_' + Date.now().toString(),
          email,
          password, // Gerçek bir sistemde şifre hash'lenir (bcrypt)
          companyName,
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        // Yeni kullanıcı için boş veri alanları oluştur
        const initialData = {
          companyName,
          email,
          dataEntry: null,
          analyzedData: null,
          supplyChain: [],
          wallet: {
             balance: 0,
             credits: []
          }
        };
        localStorage.setItem(`db_data_${newUser.id}`, JSON.stringify(initialData));

        resolve({ user: newUser });
      }, 800); // Gerçek ağ gecikmesini simüle et (800ms)
    });
  },

  // Kullanıcı Giriş (Login)
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          resolve({ user });
        } else {
          reject(new Error('E-posta veya şifre hatalı. Lütfen tekrar deneyin.'));
        }
      }, 600);
    });
  },

  // Kullanıcının (Firmanın) verilerini getir
  getUserData: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(`db_data_${userId}`);
        resolve(data ? JSON.parse(data) : null);
      }, 300);
    });
  },

  // Kullanıcının (Firmanın) verilerini kalıcı olarak kaydet
  saveUserData: async (userId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingDataStr = localStorage.getItem(`db_data_${userId}`);
        const existingData = existingDataStr ? JSON.parse(existingDataStr) : {};
        
        // Sadece değişen alanları güncelle (Merge)
        const updatedData = { ...existingData, ...data };
        localStorage.setItem(`db_data_${userId}`, JSON.stringify(updatedData));
        resolve({ success: true, data: updatedData });
      }, 500);
    });
  },

  // E-Posta var mı kontrol et (Şifre Sıfırlama İçin)
  checkEmailExists: async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(u => u.email === email);
        resolve({ exists: !!user });
      }, 400);
    });
  },

  // Şifre Sıfırlama
  resetPassword: async (email, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.email === email);
        
        if (userIndex !== -1) {
          users[userIndex].password = newPassword;
          saveUsers(users);
          resolve({ success: true });
        } else {
          reject(new Error('Kullanıcı bulunamadı.'));
        }
      }, 500);
    });
  }
};
