import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import { fetchReport } from "../action";

const Report = () => {
  const dispatch = useDispatch();
  const [noTopSeller, setNoTopSeller] = useState(2);

  useEffect(() => {
    dispatch(fetchReport());
    // eslint-disable-next-line
  }, []);

  const storeData = useSelector(state => ({
    Report: state.Report
  }));

  const RenderArray = () => {
    if (!isEmpty(storeData.Report)) {
      let tempArray = [...storeData.Report[0].soldProduct];

      tempArray.sort((a, b) => {
        if (a.number > b.number) {
          return -1;
        }
        if (a.number < b.number) {
          return 1;
        }
        return 0;
      });

      return tempArray.slice(0, noTopSeller).map((value, i) => {
        return (
          <div key={i} value={i}>
            <div className="row">
              <div className="col">Product: {value.name}</div>
              <div className="col">Number Sold: {value.number}</div>
              <div className="col">Renvenue: ${value.number * value.price}</div>
            </div>
          </div>
        );
      });
    } else return <></>;
  };

  return (
    <div>
      <h2 className="my-3">
        Today's Revenue: $
        {isEmpty(storeData.Report)
          ? "Loading"
          : storeData.Report[0].dailyRenvenue}
      </h2>
      <div className="my-2 d-flex">
        <h3>Today Top {noTopSeller} Seller</h3>
        <div className="btn-group ml-3" role="group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => noTopSeller === 10 ? null : setNoTopSeller(noTopSeller + 1)}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              noTopSeller === 0 ? null : setNoTopSeller(noTopSeller - 1)
            }
          >
            -
          </button>
        </div>
      </div>
      <RenderArray />
    </div>
  );
};

export default Report;
