import React, { Fragment, useState } from "react";
import { data } from "../../utils/data";

import "./Table.scss";

export const Table: React.FC = () => {
  const [activeItem, setActiveItem] = useState<null | number>(null);
  const [sortActive, setSortActive] = useState(false);
  console.log(data.map((el) => console.log(el)));

  const handleClickOpenChild = (id: number): void => {
    setActiveItem(id);
  };

  const handleClickActiveSort = (): void => {
    setSortActive(!sortActive);
  };

  return (
    <div className="main__content">
      <button
        onClick={handleClickActiveSort}
        className="main__content__is-active-button"
      >
        IsActive
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((personActive) =>
              sortActive ? personActive.isActive : personActive
            )
            .map((person) => (
              <Fragment>
                {!person.parentId && (
                  <tr
                    key={person.id}
                    className="person-parent"
                    onClick={() => handleClickOpenChild(person.id)}
                  >
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.balance}</td>
                  </tr>
                )}
                {data.map(
                  (childPerson) =>
                    childPerson.parentId === person.id && (
                      <Fragment>
                        <tr
                          key={childPerson.id}
                          className={`list-of-child ${
                            activeItem === person.id ||
                            activeItem === person.parentId
                              ? "active"
                              : ""
                          } `}
                        >
                          <td>{childPerson.name}</td>
                          <td>{childPerson.email}</td>
                          <td>{childPerson.balance}</td>
                        </tr>
                      </Fragment>
                    )
                )}
              </Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};
