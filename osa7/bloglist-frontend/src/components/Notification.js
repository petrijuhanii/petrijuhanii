import { connect } from 'react-redux'

const Notification = (props) => {
  let style = {}
  if(props.notification[1]===true){
    style = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  }else{
    style = {
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  }

  console.log(props.notification)
  if(props.notification.length===0){
    return(<div></div>)
  }
  return (
    <div style={style}>
      {props.notification[0]}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification