import React from 'react'
import axios from 'axios'
<<<<<<< HEAD
import Auth from '../../../controllers/auth'
import Navbar from '../common/Navbar'
=======
import Auth from '../../lib/auth'
>>>>>>> development

class Login extends React.Component {
 state = {
   data: {
     email: '',
     password: ''
   },
   error: ''
 }
 
 handleChange = ({ target: { name, value } }) => {
   const data = { ...this.state.data, [name]: value }
   this.setState({ data, error: '' })
 }

 handleSubmit = async e => {
   e.preventDefault()
   try {
     const res =  await axios.post('/api/login', this.state.data)
     console.log(this.state.data, 'data')
     Auth.setToken(res.data.token)

     this.props.history.push('/users')
   } catch (err) {
     this.setState({ error: 'Invalid Credentials' })
   }
 }

 render() {
   return (
     <>
<<<<<<< HEAD
     <Navbar/>
=======
>>>>>>> development
     <section className="section">
       <div className="container">
         <div className="columns">
           <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter">
             <h2 className="title">Login</h2>
             <div className="field">
               <label className="label">Email</label>
               <div className="control">
                 <input
                   className={`input ${this.state.error ? 'is-danger' : ''}`}
                   name="email"
                   placeholder="Email"
                   onChange={this.handleChange}
                 />
               </div>
             </div>
             <div className="field">
               <label className="label">Password</label>
               <div className="control">
                 <input
                   className={`input ${this.state.error ? 'is-danger' : ''}`}
                   type="password"
                   name="password"
                   placeholder="Password"
                   onChange={this.handleChange}
                 />
               </div>
               {this.state.error && <small className="is-danger">{this.state.error}</small>}
             </div>
             <button type="submit" className="button is-warning is-fullwidth">Login</button>
           </form>
         </div>
       </div>
     </section>
     </>
   )
 }
}
export default Login