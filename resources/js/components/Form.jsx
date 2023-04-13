import React, { useState, useEffect } from "react";

const Form = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  const [currentTab, setCurrentTab] = useState("tabIncome");
  const [selectItem, setSelectItem] = useState(["給料"]);
  const [selectDate, setSelectDate] = useState(yyyy + "-" + mm + "-" + dd);
  const [items, setItems] = useState([]);
  const [inputAmount, setInputAmount] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [inputMemo, setInputMemo] = useState("");
  const [incTransactions, setIncTransactions] = useState([]);
  const [expTransactions, setExpTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const incomeItem = ["給料", "おこづかい", "賞与", "副業", "投資", "臨時収入"];
  const incomeItemImage = [
    "/img/salary.svg",
    "/img/pocket.svg",
    "/img/bonus.svg",
    "/img/subjob.svg",
    "/img/investment.svg",
    "/img/extra.svg"
  ];
  const expenseItem = ["食費","日用品","衣服","美容","交際費","医療費","教育費","光熱費","交通費","通信費","家賃"];
  const expenseItemImage = [
    "/img/food.svg",
    "/img/daily.svg",
    "/img/clothes.svg",
    "/img/beauty.svg",
    "/img/entertainment.svg",
    "/img/medic.svg",
    "/img/education.svg",
    "/img/utility.svg",
    "/img/transport.svg",
    "/img/communication.svg",
    "/img/rent.svg"
  ];

  const switchIncomeTab = () => {
    setCurrentTab("tabIncome");
    setSelectItem([""]);
  };

  const switchExpenseTab = () => {
    setCurrentTab("tabExpense");
    setSelectItem([""]);
  };

  const displayItem = (item) => {
    setSelectItem(item);
  };

  const addTransaction = () => {
    if (!selectItem[0]) return alert("項目を入力してください");
    if (!inputAmount) return alert("金額を入力してください");
    const newTransaction = {
      id:
        currentTab === "tabIncome"
          ? incTransactions.length + 1
          : expTransactions.length + 1,
      date: selectDate,
      item: selectItem,
      amount: parseFloat(inputAmount),
      memo: inputMemo,
      tab: currentTab
    };
    if (currentTab === "tabIncome") {
      setIncTransactions([...incTransactions, newTransaction]);
      setIncomeAmount(incomeAmount + parseFloat(inputAmount));
    } else {
      setExpTransactions([...expTransactions, newTransaction]);
      setExpenseAmount(expenseAmount + parseFloat(inputAmount));
    }
    /* setSelectItem(["給料"]); 
    setSelectDate(""); 
    setInputMemo("");
    setInputAmount(0); */
  };

  const deleteTransaction = (del) => {
    if (del.tab === "tabIncome") {
      setIncomeAmount(incomeAmount - del.amount);
      setIncTransactions(
        incTransactions.filter((transaction) => transaction.id !== del.id)
      );
    } else {
      setExpenseAmount(expenseAmount - del.amount);
      setExpTransactions(
        expTransactions.filter((transaction) => transaction.id !== del.id)
      );
    }
  };

  useEffect(() => {
    setTotalAmount(incomeAmount - expenseAmount);
  }, [incomeAmount, expenseAmount]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputDate = new Date(selectDate); 
    const formatDate = 
      inputDate.getFullYear() +
      '-' +
      ('0' + (inputDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + inputDate.getDate()).slice(-2);
      
      console.log(currentTab);
      console.log(selectItem);
      console.log(selectItem.join());
      console.log(formatDate);
      console.log(inputAmount);
      console.log(inputMemo);

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tab: currentTab,
          item: selectItem.join(),
          date: formatDate,
          amount: inputAmount,
          memo: inputMemo,
        }),
      });
      const data = await response.json();
      console.log(data);
      setSelectItem(["給料"]);
      setSelectDate(yyyy + "-" + mm + "-" + dd);
      setInputMemo("");
      setInputAmount(0);
      
    } catch (error) {
      console.error(error);
    } 
  };

  const handleDelete = async (id) => {
    console.log(id.id);
  try {
    const response = await fetch(`/api/data/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data); // 削除が成功した場合に、成功した旨のメッセージが表示される

    if (data.success) {
      // 削除に成功した場合、削除されたデータを一覧から取り除く
      setItems(items.filter((item) => item.id !== id));
      console.log(item);
    } else {
      // 削除に失敗した場合、エラーメッセージを表示するなどの処理を行う
      console.log(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

  
  return (
    <>
      <div className="App">
        <div className="headerTitle">
          <h1>家計簿アプリ</h1>
          <button
            className={currentTab === "tabIncome" ? "IsActive" : ""}
            type="button"
            onClick={switchIncomeTab}
          >
            収入
          </button>
          <button
            className={currentTab === "tabExpense" ? "IsActive" : ""}
            type="button"
            onClick={switchExpenseTab}
          >
            支出
          </button>
        </div>
        {currentTab === "tabIncome" ? (
          <div className="earn">
            {incomeItem.map((item, index) => (
              <button
                key={index}
                type="button"
                className={selectItem[0] === item ? "IsActive" : ""}
                style={{backgroundImage: `url(${incomeItemImage[index]})`}}
                onClick={() => displayItem([item])}
              >
                {item}
              </button>
            ))}
          </div>
        ) : (
          <div className="payment">
            {expenseItem.map((item, index) => (
              <button
                key={index}
                type="button"
                className={selectItem[0] === item ? "IsActive" : ""}
                style={{backgroundImage: `url(${expenseItemImage[index]})`}}
                onClick={() => displayItem([item])}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="formWrapper">
            <div className="date">
            <input
              type="hidden"
              value={currentTab}
              required
            />
            <input
              type="hidden"
              value={selectItem}
              required
            />
            <p>日付</p>
            <input
              type="date"
              value={selectDate}
              onChange={(e) => {
                setSelectDate(e.target.value);
              }}
              required
            />
            </div>
            <div className="money">
              <p>金額</p>
              <input
                type="number"
                value={inputAmount}
                min="0"
                onChange={(e) => setInputAmount(e.target.value)}
                required
              />
            </div>
            <div className="memorandum">
              <p>メモ</p>
              <input
                type="text"
                value={inputMemo}
                placeholder="例) 誕生日プレゼント代"
                onChange={(e) => {
                  setInputMemo(e.target.value);
                }}
              />
            </div>
          </div>
          <input
            className="submitButton"
            type="submit"
            value="追加"
            onClick={addTransaction}
          />
        </form>
        <dl className="moneyList">
          <dt>収支計</dt>
          <dd>{totalAmount}円</dd>
          <dt>収入合計</dt>
          <dd>{incomeAmount}円</dd>
          <dt>支出合計</dt>
          <dd>{expenseAmount}円</dd>
        </dl>
        <div className="listSection">
          <div className="earnList">
            <h2>収入記録</h2>
            <table>
              <thead>
                <tr>
                  <th>日付</th>
                  <th>項目</th>
                  <th>金額</th>
                  <th>メモ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {incTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date.slice(5)}</td>
                    <td>{transaction.item}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.memo}</td>
                    <td>
                      <button
                        type="submit"
                        onClick={() => {
                          deleteTransaction(transaction);
                          handleDelete(transaction);
                        }}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="paymentList">
            <h2>支出記録</h2>
            <table>
              <thead>
                <tr>
                  <th>日付</th>
                  <th>項目</th>
                  <th>金額</th>
                  <th>メモ</th>
                </tr>
              </thead>
              <tbody>
                {expTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date.slice(5)}</td>
                    <td>{transaction.item}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.memo}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          deleteTransaction(transaction);
                          handleDelete();
                        }}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;