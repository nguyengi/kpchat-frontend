import Api from './common'

const AuthApi = {
    login(data)
    {
        return Api.post('login', data)
    },

    register(data)
    {
        return Api.post('register', data)
    },

    loadUser()
    {
        return Api.get('auth/user')
    }
}

export default AuthApi