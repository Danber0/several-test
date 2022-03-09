import React, { Fragment, useState } from "react";
import { data } from "../../utils/data";

import "./Table.scss";

export const Table: React.FC = () => {
  const [activeItemChild, setActiveItemChild] = useState<null | number>(null);
  const [activeItemGrandChild, setActiveItemGrandChild] = useState<
    null | number
  >(null);
  const [sortActive, setSortActive] = useState(false);
  console.log(data.map((el) => console.log(el)));

  const handleClickOpenChild = (id: number): void => {
    //Проверка, чтобы при повторном нажатии список закрывался.
    if (id !== activeItemChild) {
      setActiveItemChild(id);
    } else {
      setActiveItemChild(null);
      setActiveItemGrandChild(null);
    }
  };

  const handleClickOpenGrandChild = (id: number): void => {
    //Та же самая проверка, что и выше.
    if (id !== activeItemGrandChild) {
      setActiveItemGrandChild(id);
    } else {
      setActiveItemGrandChild(null);
    }
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
                          onClick={() =>
                            handleClickOpenGrandChild(childPerson.id)
                          }
                          className={`list-of-child ${
                            activeItemChild === person.id ? "active" : ""
                          } `}
                        >
                          <td>{childPerson.name}</td>
                          <td>{childPerson.email}</td>
                          <td>{childPerson.balance}</td>
                        </tr>
                        {data
                          .filter((personActive) =>
                            sortActive ? personActive.isActive : personActive
                          )
                          .map(
                            (grandchildPerson) =>
                              grandchildPerson.parentId === childPerson.id && (
                                <Fragment>
                                  <tr
                                    key={grandchildPerson.id}
                                    className={`list-of-child-grand ${
                                      activeItemGrandChild === childPerson.id
                                        ? "active"
                                        : ""
                                    } `}
                                  >
                                    <td>{grandchildPerson.name}</td>
                                    <td>{grandchildPerson.email}</td>
                                    <td>{grandchildPerson.balance}</td>
                                  </tr>
                                </Fragment>
                              )
                          )}
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
// data.map((grandchildPerson: any) => (
//   <Fragment>
//     <tr
//       key={grandchildPerson.id}
//       className={`list-of-child ${
//         activeItemChild === person.id ? "active" : ""
//       } `}
//     >
//       <td>{grandchildPerson.name}</td>
//       <td>{grandchildPerson.email}</td>
//       <td>{grandchildPerson.balance}</td>
//     </tr>
//   </Fragment>
// ))
