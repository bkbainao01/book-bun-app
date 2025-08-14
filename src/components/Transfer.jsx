"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"



function moveRight({
  originLeftList,
  setLeftList,
  selectedLeft,
  setOriginLeftList,
  originRightList,
  setRightList,
  setOriginRightList,
  setSelectedLeft,
  onTransferSelected
}) {
    const moveItems = originLeftList.filter(item => selectedLeft?.includes(item.id));

    const updatedRight = [...originRightList, ...moveItems].sort((a, b) => a.name.localeCompare(b.name));
    const updatedLeft = originLeftList.filter(item => !selectedLeft.includes(item.id)).sort((a, b) => a.name.localeCompare(b.name));

    setOriginRightList(updatedRight);
    setRightList(updatedRight);

    setOriginLeftList(updatedLeft);
    setLeftList(updatedLeft);

    onTransferSelected({left:updatedLeft, right:updatedRight});
    setSelectedLeft([]);
  }

  const moveLeft = ({
    originLeftList,
    setOriginLeftList,
    setLeftList,
    originRightList,
    selectedRight,
    setOriginRightList,
    setRightList,
    onTransferSelected,
    setSelectedRight
  }) => {
    const moveItems = originRightList.filter(item => selectedRight.includes(item.id));

    const updatedLeft = [...originLeftList, ...moveItems].sort((a, b) => a.name.localeCompare(b.name));
    const updatedRight = originRightList.filter(item => !selectedRight.includes(item.id)).sort((a, b) => a.name.localeCompare(b.name));

    setOriginLeftList(updatedLeft);
    setLeftList(updatedLeft);

    setOriginRightList(updatedRight);
    setRightList(updatedRight);

    onTransferSelected({left:updatedLeft, right:updatedRight});
    setSelectedRight([]);
  }

  function toggleSelection({id, selected, setSelected}) {
    let selectedList = selected?.includes(id)
        ? selected.filter(v => v !== id)
        : [...selected, id]
    setSelected(selectedList)
  }

  function onSearch({
    value,
    key,
    setSearchSelectedLeft,
    originLeftList,
    setLeftList,
    setSearchSelectedRight,
    originRightList,
    setRightList
  }) {
    const regex = new RegExp(value, 'i');
    if (key === 'left') {
      setSearchSelectedLeft(value);
      const filtered = originLeftList.filter(item => regex.test(item.name));
      setLeftList(filtered);
    } else {
      setSearchSelectedRight(value);
      const filtered = originRightList.filter(item => regex.test(item.name));
      setRightList(filtered);
    }
  }

  function onClearInput({
    key,
    setSearchSelectedLeft,
    setLeftList,
    originLeftList,
    setSearchSelectedRight,
    setRightList,
    originRightList
  }) {
    if (key === 'left') {
      setSearchSelectedLeft('');
      setLeftList(originLeftList);
    } else {
      setSearchSelectedRight('');
      setRightList(originRightList);
    }
  }

export default function Transfer({ leftListProp = [], rightListProp = [], onTransferSelected }) {
  const { t } = useTranslation();
  const [originLeftList, setOriginLeftList] = useState([]);
  const [originRightList, setOriginRightList] = useState([]);
  const [leftList, setLeftList] = useState([])
  const [rightList, setRightList] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState([])
  const [selectedRight, setSelectedRight] = useState([])
  const [searchSelectedLeft, setSearchSelectedLeft] = useState("")
  const [searchSelectedRight, setSearchSelectedRight] = useState("")


  useEffect(() => {
    const sorted = [...leftListProp].sort((a, b) => a.name.localeCompare(b.name));
    if (JSON.stringify(sorted) !== JSON.stringify(originLeftList)) {
      setOriginLeftList(sorted);
      setLeftList(sorted);
    }
  }, [leftListProp, originLeftList]);

  useEffect(() => {
    const sorted = [...rightListProp].sort((a, b) => a.name.localeCompare(b.name));
    if (JSON.stringify(sorted) !== JSON.stringify(originRightList)) {
      setOriginRightList(sorted);
      setRightList(sorted);
    }
  }, [rightListProp,originRightList]);




  return (
      <div className="transfer">
        {/* Left list */}
        <Card className="transfer-left" >
          <div className="transfer-title">{ t('transfer.available') }</div>
          <div className="transfer-box">
              <div className="transfer-search">
                  <Input
                  id="available"
                  type="text"
                  placeholder={ t('transfer.placeholder') }
                  required
                  value={searchSelectedLeft}
                  onChange={(e)=> onSearch({
                    value: e.target.value,
                    key:'left',
                    setSearchSelectedLeft,
                    originLeftList,
                    setLeftList,
                    setSearchSelectedRight,
                    originRightList,
                    setRightList
                  })}
                  />
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={`x-clear-data-btn ${ searchSelectedLeft?.length ? 'active' : '' }`}
                    onClick={() => onClearInput({
                      key:'left',
                      setSearchSelectedLeft,
                      setLeftList,
                      originLeftList,
                      setSearchSelectedRight,
                      setRightList,
                      originRightList
                    })} />
              </div>
              <div className="transfer-list">
                  { leftList.map(item => (
                      <label key={item.id} className="flex items-center gap-2">
                      <Checkbox
                          checked={selectedLeft.includes(item.id)}
                          onCheckedChange={() =>
                              toggleSelection({ id:item.id, selected:selectedLeft, setSelected:setSelectedLeft})
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
          <Button
            onClick={()=> moveRight({
              originLeftList,
              setLeftList,
              selectedLeft,
              setOriginLeftList,
              originRightList,
              setRightList,
              setOriginRightList,
              setSelectedLeft,
              onTransferSelected
            })}
            disabled={selectedLeft.length === 0}>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </Button>
          <Button
            onClick={()=> moveLeft({
              originLeftList,
              setOriginLeftList,
              setLeftList,
              originRightList,
              selectedRight,
              setOriginRightList,
              setRightList,
              onTransferSelected,
              setSelectedRight
            })}
            disabled={selectedRight.length === 0}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </Button>
        </div>

        {/* Right list */}
        <Card className="transfer-right">
          <div className="transfer-title">{ t('transfer.selected') }</div>
          <div className="transfer-box">
              <div className="transfer-search">
                  <Input
                  id="selected"
                  type="text"
                  placeholder={ t('transfer.placeholder') }
                  required
                  value={searchSelectedRight}
                  onChange={(e)=>onSearch({
                    value: e.target.value,
                    key:'right',
                    setSearchSelectedLeft,
                    originLeftList,
                    setLeftList,
                    setSearchSelectedRight,
                    originRightList,
                    setRightList
                  })} />
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={`x-clear-data-btn ${ searchSelectedRight?.length ? 'active' : '' }`}
                    onClick={() => onClearInput({
                      key:'right',
                      setSearchSelectedLeft,
                      setLeftList,
                      originLeftList,
                      setSearchSelectedRight,
                      setRightList,
                      originRightList
                    })} />
              </div>
              <div className="transfer-list">
                  {rightList.map(item => (
                      <label key={item.id} className="flex items-center gap-2">
                      <Checkbox
                          checked={selectedRight.includes(item.id)}
                          onCheckedChange={() =>
                          toggleSelection({id:item.id, selected:selectedRight, setSelected:setSelectedRight})
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
