import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
const Home = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page]);
  const fetchUsers = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api/?results=8&page=${page}`)
      .then((response) => response.json())
      .then((data) =>
        setUsers((prevUsers: any) => [...prevUsers, ...data.results])
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  const handlePageScroll = () => setPage((prevPage) => prevPage + 1);
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        className="logout"
        color="error"
      >
        {" "}
        Logout
      </Button>
      <InfiniteScroll
        dataLength={users.length}
        next={handlePageScroll}
        hasMore={true}
        loader={undefined}
      >
        {users.map((user) => (
          <div key={user.login.uuid} className="content">
            {loading ? (
              <Skeleton height={100} width={100} circle={true} />
            ) : (
              <img src={user.picture.thumbnail} alt={user.name.first} />
            )}
            {loading ? (
              <Skeleton height={20} width={80} />
            ) : (
              <p>
                {user.name.first} {user.name.last}
              </p>
            )}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
