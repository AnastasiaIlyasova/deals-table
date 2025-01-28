import {useNavigate} from "react-router-dom";

function Deal({deal}) {
  const navigate = useNavigate();
  const {id, name, status, createdDate} = deal;

  function handleClick() {
    navigate(`/deal/${id}`)
  }

  return (
    <li className="deal-list__item deal-list__item-actual" onClick={handleClick}>
      <div>{id}</div>
      <div>{name}</div>
      <div>{status}</div>
      <div>{createdDate}</div>
    </li>
  )
}

export default Deal