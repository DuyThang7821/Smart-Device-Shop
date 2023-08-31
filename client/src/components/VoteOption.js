import React , {memo, useRef, useEffect}from "react";
import logo from '../assets/logo.png';
import { voteOptions } from "../ultils/contants";
import {AiFillStar} from 'react-icons/ai';
import {Button } from './'
const VoteOption = ({nameProduct}) =>{
    const modalRef = useRef();

    useEffect (()=>{
        modalRef.current?.scrollIntoView({block: 'center', behavior: 'smooth'});
    }, [])
    return(
        <div onClick={e => e.stopPropagation()} ref={modalRef} className="flex-col bg-white w-[700px] p-4 flex items-center justify-center">
            <img src={logo} alt="logo" className="w-[300px] my-8 object-content" />
            <h2 className="text-center text-medium text-lg">{`Voting product ${nameProduct}`}</h2>
            <textarea className="form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
            placeholder="type something">

            </textarea>
            <div className="w-full flex flex-col gap-4">
                <p>How do you feel this product</p>
                <div className="flex justify-center gap-4 items-center">
                    {voteOptions.map(el => (
                        <div className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-4 w-[100px] h-[100px] flex items-center justify-center flex-col gap-2" key={el.id}>
                            <AiFillStar color="gray" />
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button fw>Submit</Button>
        </div>
    )
}
export default memo(VoteOption)