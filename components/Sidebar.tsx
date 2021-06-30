import styles from "./Sidebar.module.less";
import SearchInputIcon from "../assets/search.svg";
const SearchBar = ({}) => {
    return <div className={styles.search}>
        <div className={styles.icon}>
            <SearchInputIcon></SearchInputIcon>
        </div>
        <input placeholder={"Type a search here..."} className={styles.searchInput}/>
    </div>
};

export const Sidebar = (p) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.col}>
          <div className={styles.searchBar}>
            <SearchBar></SearchBar>
          </div>
        </div>
      </div>
    </div>
  );
};
