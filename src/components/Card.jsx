// library
import { Link } from 'react-router-dom'
import '../assets/scss/card-product.scss'
import { history } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { getAddingCartProduct } from '../redux/Reducers/productReducer';
import { PageConstant } from '../Commons/page.constant';


const Card = ({ product }) => {
  const { Login } = useSelector(state => state.loginReducer)
  const { image, price, name, id } = product
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    if (Login) {
      dispatch(getAddingCartProduct({
        id,
        name,
        image,
        price,
      }))
    } else {
      history.push(`${PageConstant.login}`)
    }
  }

  return (
    <div className="card mt-3" style={{ height: '500px' }}>
      <div className="card__body">
        <img src={product.image} style={{ objectFit: 'contain' }} className="card__image" />
        <h5 className="card__title text-center">
          <Link className='text-dark' style={{ textDecoration: 'none' }} to={`/detail/${product.id}`}>{product.name}</Link>
        </h5>
        <p className="card__description text-center">{product?.description?.length > 10 ? product.description.substring(0, 30) + '...' : product.description}</p>
      </div>
      <div className='w-100 text-center'>
        <button disabled className="card__span w-50">${product.price}</button>
        <button className="card__btn w-75" onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  )
}

export default Card