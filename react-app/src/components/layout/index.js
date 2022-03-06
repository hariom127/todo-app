import Header from '../Header'

const Layout = (props) => {
  return (
    <>
      <div className="full_container">
        <div className="App">
          {props.header ? <Header /> : ''}
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Layout
