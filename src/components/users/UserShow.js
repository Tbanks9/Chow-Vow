import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class UserShow extends React.Component {
  state = { 
    user: {},
    skills: []
  }

  async componentDidMount() {
    const chefId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chefs/${chefId}`)
      this.setState({ user: res.data, skills: res.data.skills })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  offerPending = async () => {
    const chefId = this.props.match.params.id
    const loggedInUserID = Auth.getPayload()
    try {
      const loggedInUser = await axios.get(`/api/chefs/${loggedInUserID.sub}`)
      const interestedUser = loggedInUser.data
      await axios.post(`/api/chefs/${chefId}/offersPending`, { offersPending: { interestedUser } }) 
      await axios.get(`/api/chefs/${chefId}`)
    } catch (err) {
      console.log(err.response)
    }
  }
  

  // handleDelete = async () => {
  //   const chefId = this.props.match.params.id
  //   try {
  //     await axios.delete(`/api/chefs/${chefId}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.props.history.push('/chefs')
  //   } catch (err) {
  //     console.log(err.response)
  //   }
  // }

  // isOwner = () => Auth.getPayload().sub === this.state.chef._id // Subject is the user id

  render() {
    const { name, city, image } = this.state.user
    if (!this.state.user) return null
    return (
      <section className="userSection">
        <div className="userContainer">
          <div className="userInfo">
            <h2 className="title">NAME:</h2>
            <p>{name}</p>
            <hr />
            <h2 className="title">RATING:</h2>
            <div className="starRating">
              <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <hr />
            <h2 className="title">LOCATION:</h2>
            <p>{city}</p>
            <hr />
          </div>
          <div className="userImage">
            <button className="button is-warning">EDIT</button>
            <hr />
            <figure className="imageContainer">
              <img className="chefImage" src={image} alt={name} />
            </figure>
            <hr />
            <button className="button is-success" onClick={this.offerPending}>INTERESTED</button>
          </div>
          <div className="skills-recipes">
            <h2 className="title">SKILLS:</h2>
            {this.state.skills.map((skill, i) => <p key={i}>{skill}</p>)}
          </div>
        </div>
      </section>
    )
  }
}

export default UserShow
