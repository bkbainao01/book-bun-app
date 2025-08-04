"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"



export default function Transfer({ dataList = [] }) {
  const [leftList, setLeftList] = useState([])
  const [rightList, setRightList] = useState([])
  const [selectedLeft, setSelectedLeft] = useState([])
  const [selectedRight, setSelectedRight] = useState([])
  const [searchSelectedLeft, setSearchSelectedLeft] = useState("")
  const [searchSelectedRight, setSearchSelectedRight] = useState("")

  useEffect(() => {
    setLeftList(dataList)
  }, [dataList])

  const moveRight = () => {
    const moveItems = leftList.filter(item => selectedLeft.includes(item.id))
    setRightList([...rightList, ...moveItems])
    setLeftList(leftList.filter(item => !selectedLeft.includes(item.id)))
    setSelectedLeft([])
  }

  const moveLeft = () => {
    const moveItems = rightList.filter(item => selectedRight.includes(item.id))
    setLeftList([...leftList, ...moveItems])
    setRightList(rightList.filter(item => !selectedRight.includes(item.id)))
    setSelectedRight([])
  }

  const toggleSelection = (id, selected, setSelected) => {
    setSelected(
      selected.includes(id)
        ? selected.filter(v => v !== id)
        : [...selected, id]
    )
  }

  return (
    <div className="transfer">
      {/* Left list */}
      <Card className="transfer-left" >
        <div className="transfer-title">Available</div>
        <div className="transfer-box">
            <div className="transfer-search">
                <Input
                id="available"
                type="text"
                placeholder="Enter Keyword"
                required
                value={searchSelectedLeft}
                onChange={(e)=>setSearchSelectedLeft(e.target.value)}
                />
            </div>
            <div className="transfer-list">
            {leftList.map(item => (
                <label key={item.id} className="flex items-center gap-2">
                <Checkbox
                    checked={selectedLeft.includes(item.id)}
                    onCheckedChange={() =>
                        toggleSelection(item.id, selectedLeft, setSelectedLeft)
                    }
                />
                {item.name}
                </label>
            ))}
            </div>
        </div>
      </Card>

      {/* Buttons */}
      <div className="transfer-icons">
        <Button onClick={moveRight} disabled={selectedLeft.length === 0}>
          →
        </Button>
        <Button onClick={moveLeft} disabled={selectedRight.length === 0}>
          ←
        </Button>
      </div>

      {/* Right list */}
      <Card className="transfer-right">
        <div className="transfer-title">Selected</div>
        <div className="transfer-box">
            <div className="transfer-search">
                <Input
                id="selected"
                type="text"
                placeholder="Enter Keyword"
                required
                value={searchSelectedRight}
                onChange={(e)=>setSearchSelectedRight(e.target.value)}
                />
            </div>
            <div className="transfer-list">
            {rightList.map(item => (
                <label key={item.id} className="flex items-center gap-2">
                <Checkbox
                    checked={selectedRight.includes(item.id)}
                    onCheckedChange={() =>
                    toggleSelection(item.id, selectedRight, setSelectedRight)
                    }
                />
                {item.name}
                </label>
            ))}
            </div>
        </div>
      </Card>
    </div>
  )
}
