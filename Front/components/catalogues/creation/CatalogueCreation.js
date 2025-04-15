import { useState, useEffect } from "react";
import classes from "./CatalogueCraetion.module.css";
import Details from "./steps/Details/Details";
import General from "./steps/general/General";
import { useRouter } from "next/router";

const CatalogueCration = () => {
  const router = useRouter();
  console.log("(router.query.id_cataloge", router.query.id_cataloge);

  const [progress, setProgress] = useState(1);
  const [id_cataloge, setIdCataloge] = useState(router.query.id_cataloge);
  // const [catalog, setCatalog] = useState(null);

  // const getCataloge = async () => {
  //   try {
  //     const response = await api.get(`/cataloge/show/${id_cataloge}`);
  //     setCatalog(response.data.data);
  //   } catch (err) {
  //     setError(err?.response?.data?.message);
  //     console.log("err", err);
  //   }
  // };

  // useEffect(() => {
  //   console.log("id_cataloge", id_cataloge);
  //   if (id_cataloge) {
  //     getCataloge();
  //   }
  // }, []);

  const upgrade = () => setProgress(2);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <ul className={classes.breadcrump}>
          <li
            className={`${classes.breadcrump_item} ${
              progress == 1 && classes.active
            }`}
            onClick={() => setProgress(1)}
          >
            <div className={classes.breadcrump_progress}>1</div>
            <h6 className={classes.breadcrump_title}>General informations</h6>
          </li>
          <div className={classes.separator}>&gt;</div>
          <li
            className={`${classes.breadcrump_item} ${
              progress == 2 && classes.active
            }`}
            // onClick={() => setProgress(2)}
          >
            <div className={classes.breadcrump_progress}>2</div>
            <h6 className={classes.breadcrump_title}>Details</h6>
          </li>
        </ul>

        <div className={classes.content}>
          {progress == 1 && (
            <General
              progress={progress}
              id_cataloge={id_cataloge}
              setProgress={setProgress}
              setIdCataloge={setIdCataloge}
            />
          )}
          {progress == 2 && (
            <Details
              progress={progress}
              id_cataloge={id_cataloge}
              setProgress={setProgress}
              setIdCataloge={setIdCataloge}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogueCration;
