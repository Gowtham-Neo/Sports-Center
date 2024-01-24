import { Outlet } from "react-router-dom"
import Header from "./Header"

const AccountLayout = () => {

  return (
    <>
      <Header />
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AccountLayout