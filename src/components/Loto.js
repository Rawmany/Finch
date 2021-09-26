import React from "react";
import '../main.css';

const Loto = (props) => {

    const { numericCells, toggleCell, fillCells, checkResult} = props;

    const addCells = (item) => {
        return <div key={ item.value } onClick={() => {toggleCell(item);}}
                    className={item.isChosen ? "chosen": ""}>{ item.value }</div>
    }


    let mainCells = numericCells.main.map(item => {
        return addCells(item);
    })
    let additionalCells = numericCells.additional.map(item => {
        return addCells(item);
    })

    return(
        <div className={"lotoContainer"}>
            <div className={"magicWand"} onClick={() => {fillCells();}}></div>
            <div className={"box box_top"}>
                <div className={"title"}>
                    <h4>Field 1</h4>
                    <p>Choose 8 digits</p>
                </div>
                <div className={"cells"}>
                    {mainCells}
                </div>
            </div>
            <div className={"box box_bottom"}>
                <div className={"title"}>
                    <h4>Field 2</h4>
                    <p>Choose 1 digit</p>
                </div>
                <div className={"cells"}>
                    {additionalCells}
                </div>
            </div>
            <button type={"button"} className={"resultBtn"} onClick={() => {checkResult();}}>Show result</button>
        </div>
    )
}

export default Loto;