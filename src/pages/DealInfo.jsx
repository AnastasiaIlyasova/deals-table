import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {updateDeal, addComment} from "../slices/dealSlice";
import CustomSelect from "../components/CustomSelect";
import Comments from "../components/Comments";

function DealInfo() {
  const deals = useSelector(store => store.deal.deals);
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentDeal = deals.find(function (deal) {
    return +deal.id === +id;
  })
  const {name, status} = currentDeal;
  const [fullName, setFullName] = useState(currentDeal?.fullName || "");
  const [tel, setTel] = useState(currentDeal?.tel || "");
  const [budget, setBudget] = useState(currentDeal?.budget || "");
  const [progress, setProgress] = useState(currentDeal?.status || "");
  const [createdDate, setCreatedDate] = useState(currentDeal?.createdDate || "");
  const [isEditing, setIsEditing] = useState({
    status: false,
    tel: false,
    budget: false,
    fullName: false,
    createdDate: false,
  });
  const [showBtns, setShowBtns] = useState(false);

  useEffect(function () {
    const valuesFromObject = Object.values(isEditing);

    if (valuesFromObject.every((value) => value === false)) {
      setShowBtns(false);
    }
  }, [isEditing])

  useEffect(function () {
    if(!currentDeal.name) return
    document.title = `${currentDeal.name}`;

    return function () {
      document.title = 'Deals table';
    }
  }, [currentDeal.name])

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));

    field === 'tel' ? setTel(currentDeal.tel) : field === 'budget' ? setBudget(currentDeal.budget) : field === 'fullName' ? setFullName(currentDeal.fullName) : setCreatedDate(currentDeal.createdDate);
  };

  const handleSelectChange = (value) => {
    setProgress(value);
    if (value !== (currentDeal.status || ""))  {
      setShowBtns(true);
    }
  };

  const handleEnter = (comment) => {
    dispatch(addComment({ id, comment }))
  }

  function handleClick() {
    setIsEditing((prevState) => ({
      status: false,
      tel: false,
      budget: false,
      fullName: false,
      createdDate: false,
    }));

    dispatch(updateDeal({ id, fullName, tel, budget, progress, createdDate }));
    setShowBtns(false);
  }
  
  function handleCancelChanges() {
    setFullName(currentDeal.fullName || "");
    setTel(currentDeal.tel || "");
    setBudget(currentDeal.budget || "");
    setProgress(currentDeal.status || "");
    setCreatedDate(currentDeal.createdDate || "");
    setIsEditing({
      status: false,
      tel: false,
      budget: false,
      fullName: false,
      createdDate: false,
    });

    setShowBtns(false);
  }

  const checkForChanges = (value) => {
    const isChanged =
      value !== (currentDeal.fullName || "") ||
      value !== (currentDeal.tel || "") ||
      value !== (currentDeal.budget || "") ||
      value !== (currentDeal.status || "") ||
      value !== (currentDeal.createdDate || "");

    setShowBtns(isChanged);
  };

  return (
    <div className="deal-info-wrapper">
      <div className="deal-info-name">{name}</div>
      <div className="deal-info-status" style={{
        "--progress-value":
          status === "Новый"
            ? 1
            : status === "В работе"
              ? 2
              : status === "Почти завершен"
                ? 3
                : 4,
        "--progress-color":
          status === "Новый"
            ? "#D29A00"
            : status === "В работе"
              ? "#CACA00"
              : status === "Почти завершен"
                ? "#69D200"
                : status === "Успешно"
                  ? "#00C907"
                  : "#ED0000",
      }}>
        <p className="deal-info-status__title">Статус</p>
        <progress max={4} value={status === 'Новый' ? 1 : status === 'В работе' ? 2 : status === 'Почти завершен' ? 3 : 4}></progress>
        <span className="progress-status">{status}</span>
      </div>
      <div className="deal-info-details">
        <div className="deal-info-data">
          <div className="deal-info-block deal-info-block-status">
            <span className="deal-info-status-label">Статус</span>
            <button onClick={() => handleEditToggle("status")}>
             {isEditing.status ? "Отменить" : "Изменить"}
           </button>
            </div>
          {isEditing.status ? <CustomSelect placeholder={currentDeal.status} onChange={handleSelectChange}/> : <div className="deal-info-fake-input deal-info-text__status">{currentDeal.status}</div>}

          <div className="deal-info-block deal-info-block-tel">
            <span>Номер телефона</span>
            <button onClick={() => handleEditToggle("tel")}>
              {isEditing.tel ? "Отменить" : "Изменить"}
            </button>
          </div>
            {isEditing.tel ?  <input type="tel" value={tel} onChange={(e) => {
              setTel(e.target.value);
              checkForChanges( e.target.value);
            }}/> : <div className="deal-info-fake-input deal-info-text__tel">{currentDeal.tel}</div>}

          <div className="deal-info-block deal-info-block-budget">
            <span>Бюджет</span>
            <button onClick={() => handleEditToggle("budget")}>
              {isEditing.budget ? "Отменить" : "Изменить"}
            </button>
          </div>
          {isEditing.budget ? <input type="text" value={budget} onChange={(e) => {
            setBudget(e.target.value);
            checkForChanges(e.target.value);
          }}/> : <div className="deal-info-fake-input deal-info-text__budget">{currentDeal.budget}</div>}

          <div className="deal-info-block deal-info-block-fullName">
            <span>ФИО</span>
            <button onClick={() => handleEditToggle("fullName")}>
              {isEditing.fullName ? "Отменить" : "Изменить"}
            </button>
          </div>
          {isEditing.fullName ? <input type="text" value={fullName} onChange={(e) => {
            setFullName(e.target.value);
            checkForChanges(e.target.value);
          }}/> : <div className="deal-info-fake-input deal-info-text__name">{currentDeal.fullName}</div>}

          <div className="deal-info-block deal-info-block-created-date">
            <span>Дата создания</span>
            <button onClick={() => handleEditToggle("createdDate")}>
              {isEditing.createdDate ? "Отменить" : "Изменить"}
            </button>
          </div>
          {isEditing.createdDate ? <input type="text" value={createdDate} onChange={(e) => {
            setCreatedDate(e.target.value);
            checkForChanges(e.target.value);
          }}/> : <div className="deal-info-fake-input deal-info-text__date">{currentDeal.createdDate}</div>}
        </div>
        <div className="deal-info-comments">
          <Comments dealComments={currentDeal?.comments} onEnter={handleEnter}/>
        </div>
      </div>
      {showBtns && (
        <div className="deal-info__bottom">
          <button className="form__btn btn-create" onClick={handleClick}>Сохранить</button>
          <button disabled="" className="form__btn btn-close" onClick={handleCancelChanges}>Отмена</button>
        </div>
      )}

    </div>
  )
}

export default DealInfo