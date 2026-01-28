'use client'

import React, { useMemo, useState } from "react"

type Item = { priority: number; text: string }

const Home = () => {
  const [items, setItems] = useState<Item[]>([])
  const [text, setText] = useState("")
  const [priorityInput, setPriorityInput] = useState("")
  

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.priority - b.priority)
  }, [items])

  const missing = useMemo(() => {
    const present = new Set(items.map(i => i.priority))
    const max = Math.max(0, ...present)

    return Array.from({ length: max }, (_, i) => i + 1)
      .filter(p => !present.has(p))
  }, [items])

  const addItem = () => {
    const p = parseInt(priorityInput, 10)
    if (!text.trim() || !Number.isFinite(p) || p <= 0) return
    if (items.some(i => i.priority === p)) return
    setItems(prev => [...prev, { text: text.trim(), priority: p }])
    setText("")
    setPriorityInput("")
  }

  const deleteItem = (priority: number) => {
    setItems(prev => prev.filter(i => i.priority !== priority))
  }

  return (
    <div className="flex min-h-screen w-full justify-center items-center">
      <div className="flex flex-col bg-slate-100 w-full max-w-xl p-6 gap-6 rounded-lg">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={text}
            placeholder="Task"
            onChange={e => setText(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            min={1}
            value={priorityInput}
            placeholder="Priority"
            onChange={e => setPriorityInput(e.target.value)}
            className="border rounded px-3 py-2 w-24"
          />
          <button className="cursor-pointer px-3 py-2 border rounded" onClick={addItem}>Add</button>
        </div>
        <div className="space-y-3">
          <div>Items</div>
          <div className="space-y-2">
            {sortedItems.map(item => (
              <div key={item.priority} className="flex items-center justify-between gap-2">
                <div>{item.priority}. {item.text}</div>
                <button className="cursor-pointer px-2 py-1 border rounded" onClick={() => deleteItem(item.priority)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <div>Missing Priorities:</div>
          <div>{missing.length ? missing.join(", ") : "None"}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
