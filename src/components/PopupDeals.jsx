import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {createDeal} from "../slices/dealSlice";

function PopupDeals({setShowPopup}) {
  const [name, setName] = useState('');
  const deals = useSelector(store => store.deal.deals);
  const dispatch = useDispatch();

  function handleCreateDeal() {
    if(!name) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '.' + mm + '.' + yyyy;

    const newDeal = {
      name: name,
      id: deals.length + 1,
      createdDate: formattedToday,
      status: 'Новый',
      tel: '',
      budget: '',
      comments: [],
    };

    dispatch(createDeal(newDeal));
    setShowPopup(false)
  }

  return (
    <form className="form">
      <div className="form__title">Создать сделку</div>
      <div className="form__name-label">{name ? name : 'название'}</div>
      <input required type="text" className="form__name" placeholder="Введите название" value={name} onChange={(e) => setName(e.target.value)}/>
      <div className="form__bottom">
        <button className="form__btn btn-create" onClick={handleCreateDeal}>Создать</button>
        <button disabled="" className="form__btn btn-close" onClick={() => setShowPopup(false)}>Отмена</button>
      </div>
    </form>
  )
}

export default PopupDeals