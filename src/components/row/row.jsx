import { useState } from "react";

function Row() {
  const [row, setRow] = useState([]);
  const maxRows = 15; // must not be less than 1
  const addNewRow = () => {
    if (row.length < maxRows) {
      const newRow = [...row, { operator: "+", value: 0, enabled: true }];
      setRow(newRow);
    } else {
      alert(`You can't add more than ${maxRows} rows`);
    }
  };

  const removeRow = () => {
    if (row.length > 1) {
      const newRow = [...row];
      newRow.pop();
      setRow(newRow);
    } else {
      alert("You cannot remove more rows");
    }
  };

  const handleInput = (index, value) => {
    const rows = [...row];
    rows[index].value = value;
    setRow(rows);
    const letters = /^[A-Za-z]+$/;
    if (value.match(letters)) {
      rows[index].value = 0;
      setRow(rows);
      alert("Please enter a number");
    }
  };

  const handleOperator = (index, sign) => {
    const rows = [...row];
    rows[index].operator = sign;
    setRow(rows);
  };

  const toggleEnabled = (index) => {
    const rows = [...row];
    rows[index].enabled = !rows[index].enabled;
    setRow(rows);
  };

  const deleteSpecificRow = (index) => {
    if (row.length > 1) {
      const rows = [...row];
      rows.splice(index, 1);
      setRow(rows);
    } else {
      alert("You can't delete the last row");
    }
  };
  const operation = (rows) => {
    let operationValue = 0;
    const pattern = /[^0-9]/g;
    rows.forEach((row) => {
      if (row.enabled && !pattern.test(row.value)) {
        if (row.operator === "+") {
          operationValue += Number(row.value);
        }
        if (row.operator === "-") {
          operationValue -= Number(row.value);
        }
        if (row.operator === "*") {
          operationValue *= Number(row.value);
        }
        if (row.operator === "/" && row.value !== 0) {
          operationValue /= Number(row.value);
        }
      }
    });
    return operationValue;
  };

  return (
    <>
      <div className='text-2xl p-6 font-extralight'>
        Current Value:<span className='text-3xl font-bold'> {operation(row)}</span>
      </div>
      <div className='mb-10'>
        <button
          className='bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full m-10 transition-all'
          onClick={() => addNewRow()}>
          Add a Row +
        </button>

        <button
          className='bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full m-10 transition-all'
          onClick={() => removeRow()}>
          Delete a Row -
        </button>
      </div>
      <div className='text-sm opacity-50 font-light'>
        {row.length >= 3 ? "scroll down inside the box" : ""}
      </div>
      <div className='shadow-[0_10px_15px_1px_rgba(0,0,0,0.8)] m-10 rounded-2xl p-12 overflow-y-scroll h-[35%] min-w-[45%] text-slate-900 hover:shadow-2xl hover:translate-y-2 transition-all'>
        {row.map((row, index) => (
          <div key={index}>
            <select
              onChange={(e) => handleOperator(index, e.target.value)}
              value={row.operator}
              disabled={!row.enabled}
              className='rounded-full p-1 '>
              <option>+</option>
              <option>-</option>
              <option>*</option>
              <option>/</option>
            </select>

            <input
              type='text'
              placeholder='Type A Number'
              className='border-2 border-gray-300 bg-white h-8 px-3  rounded-lg text-sm focus:outline-none m-10'
              value={row.value}
              onChange={(e) => handleInput(index, e.target.value)}
              disabled={!row.enabled}
            />
            <button
              className='bg-transparent hover:bg-blue-700 text-blue-600 hover:text-white font-semibold py-2 px-4 mr-3 border-[3.5px] border-blue-700 rounded-full transition-all  '
              onClick={() => toggleEnabled(index)}>
              {row.enabled ? "Disable" : "Enable"}
            </button>
            <button
              className='bg-transparent hover:bg-blue-700 text-blue-600 hover:text-white font-semibold py-2 px-4   border-[3.5px] border-blue-700 rounded-full transition-all '
              onClick={() => {
                deleteSpecificRow(index);
              }}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className='text-sm opacity-50 font-light'>Row Counter: {row.length}</div>
    </>
  );
}

export default Row;
