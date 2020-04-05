import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { connect} from 'react-redux'

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';

import { createStructuredSelector } from 'reselect'

import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { selectCurrentUser } from '../../redux/user/user.selectors'

import CartDropDown from '../cart-dropdown/cart-dropdown.component'

import './header.styles.scss';

const Header = ({ currentUser,hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
        
      )}
      <CartIcon/>
      {
        hidden?null:<CartDropDown/>
      }
      
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
 user: selectCurrentUser,
  hidden:selectCartHidden

});

export default connect(mapStateToProps)(Header);
