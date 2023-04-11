import { Nav } from "../components";
import styles from "../App.module.scss";
import { APP_ROUTES } from "../utils";
import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <main className="App">
      <Nav />
      <div className={styles.container}>
        <div className={styles.hits__categories}>
          {APP_ROUTES.map((item) => (
            <NavLink
              key={item.title}
              className={({ isActive, isPending }) =>
                isActive ? `${styles.active}` : isPending ? "pending" : ""
              }
              to={item.route}
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        <div className={styles.hits}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
