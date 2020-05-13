import React, {useState} from 'react'

export const NewTrans = () => {
    const [text, setText] = useState('');
    const [amnt, setAmnt] = useState(0);

    return (
        <div>
            <h3>Add new transaction</h3>
            <form>
                <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" value = {text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                <label htmlFor="amount"
                    >Amount <br />
                    (negative - expense, positive - income)</label
                >
                <input type="number" value = {amnt} onChange={(e) => setAmnt(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </div>
    )
}
