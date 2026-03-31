import { Link } from "react-router"


export default function Settings() {
  return (
    <div>
    <div>
        <ul>
            <li>
                <Link to="/">PrintSettings</Link>
            </li>
                <li>  <Link to="/profile">Profile</Link></li>
<li><Link to="/printSettings"> PrintSettings  </Link></li>
        </ul>
    </div>
    </div>
  )
}
