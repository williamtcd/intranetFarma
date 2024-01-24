import auth from './firebase/auth.js'
import receitaDigital from './firebase/receitaDigital.js'
import clientesReceitaDigital from './firebase/clientesReceitaDigital.js'

export default {
  ...auth,
  ...receitaDigital,
  ...clientesReceitaDigital
}
