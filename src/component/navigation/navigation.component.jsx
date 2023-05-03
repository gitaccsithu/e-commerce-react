import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { signOutUser } from "../../utils/firebase/firebase.util"
import { userContext } from "../contexts/user.context"
import './navigation.style.scss'

const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(userContext);
    console.log("This is current user from navigation, ", currentUser);

    const singOutHandler = async () => {
      signOutUser();
      setCurrentUser(null);
    }

    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <div>
                <CrownLogo/>
            </div>
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {
              currentUser ? (
                <span className="nav-link" onClick={singOutHandler}>SIGN OUT</span>
              ):
              (
                <Link className="nav-link" to="/signin">
                    SIGNIN
                </Link>
              )
            }
          </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation