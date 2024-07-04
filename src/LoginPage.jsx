const LoginPage = ({ setUser }) => {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please sign in to take the survey</h2>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwt_decode(credentialResponse.credential);
            setUser(decoded);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    );
  };