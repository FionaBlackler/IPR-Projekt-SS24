const useAuth = () => ({
    logout: jest.fn(),
    user: { name: "Test User" },
    isAuthenticated: true,
    login: jest.fn(),
    loading: false,
  });
  
  export default useAuth;