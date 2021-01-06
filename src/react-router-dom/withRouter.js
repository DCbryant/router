import Route from './Route'

function withRouter (Component) {
  // 算是一个高阶组件，把传过来的组件包装一下再返回
  return props => (
    <Route render={routerProps => <Component {...routerProps} />} />
  )
}

export default withRouter