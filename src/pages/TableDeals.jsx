import PopupDeals from "../components/PopupDeals";
import {useState} from "react";
import {useSelector} from "react-redux";
import Deal from "./Deal";

function TableDeals() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [filteredDeals, setFilteredDeals] = useState(null);
  const deals = useSelector(store => store.deal.deals);

  function filterDeals() {
    const filtered = deals.filter(
      (deal) => deal.status === "Успешно" || deal.status === "Провал"
    );
    setActiveBtn(2);
    setFilteredDeals(filtered);
  }

  function defaultDeals() {
    setActiveBtn(1);
    setFilteredDeals(null);
  }

  return (
    <div className="deals-wrapper">
      {showPopup && <PopupDeals setShowPopup={setShowPopup}/>}
        <button className="deals-btn__create" onClick={() => setShowPopup(true)}>Создать</button>
        <div className="deals-tabs">
          <button className={`deals-btn__all ${activeBtn === 1 ? 'active' : ''}`} onClick={defaultDeals}>Все</button>
          <button className={`deals-btn__archive ${activeBtn === 2 ? 'active' : ''}`} onClick={filterDeals}>Архив</button>
        </div>
        <ul className="list list-deals">
          <li className="deal-list__item">
            <div>id</div>
            <div>Название</div>
            <div>Статус</div>
            <div>Дата создания</div>
          </li>
          {(filteredDeals || deals).map((deal) => (
            <Deal deal={deal} key={deal.id}/>
          ))}
        </ul>
    </div>
  )
}

export default TableDeals