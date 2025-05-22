//udated version of the Login component


import React from "react";

const Login = () => {
    return (
        <div>
            <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold mb-4">Login</h1>
                    <p>Enter your email and password to access your account</p>

                </div>
                <div>
                    <h5 className="flex justify-start text-xl font-bold mb-3">User Name</h5>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username" />
                        <input type="text" placeholder="Enter-Username" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                    <h5 className=" flex justify-start text-xl font-bold mt-2 mb-3">Password</h5>
                    <label className="block text-black-700 font-bold mb-2" htmlFor="password" />
                        <input type="text" placeholder="Enter-Password" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <div>
                    <button type="submit" className="bg-black text-white px-20 py-2 rounded hover:bg-blue-700 mt-4">
                        Login
                    </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-300">
                    <p>
                        <a href="/forgot-password" className="text-blue-600 hover:underline">Forget-Password</a>
                    </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-300 ">
                    <p>
                        Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Signup</a>
                    </p>
                </div>
                
            </form>
        </div>
    )
}
 export default Login;