import React, { memo, useEffect, useState, useCallback } from "react";
import { productInfoTabs } from "../../ultils/contants";
import { Votebar, Button, VoteOption, Comment } from "..";
import { renderStarFromNumber } from "../../ultils/helpers";
import { apiRatings } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";

const ProductInfomation = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const [activedTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmitVoteOption = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert("Please vote before submitting");
      return;
    }
    await apiRatings({ star: score, comment, pid, updatedAt: Date.now() });
    rerender();
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };
  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Đăng nhập để đánh giá",
        cancelButtonText: "Hủy",
        confirmButtonText: "Đi đến đăng nhập",
        title: "Oops!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVoteOption={handleSubmitVoteOption}
            />
          ),
        })
      );
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfoTabs.map((el) => (
          <span
            className={`py-2 px-4 cursor-pointer ${
              activedTab === +el.id
                ? "bg-white border border-b-0"
                : "bg-gray-200"
            }`}
            key={el.id}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className=" w-full border p-4">
        {productInfoTabs.some((el) => el.id === activedTab) &&
          productInfoTabs.find((el) => el.id === activedTab)?.content}
      </div>

      <div className="flex flex-col py-8 w-main">

        <div className="flex border">
          <div className="flex-4 flex-col flex items-center  justify-center">
            <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(totalRatings)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
            <span className="text-sm">{`${ratings?.length} Đánh giá và phản hồi`}</span>
          </div>

          <div className="flex-6  p-4 gap-2 flex flex-col">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <Votebar
                  key={el}
                  number={el + 1}
                  ratingTotal={ratings?.length}
                  ratingCount={
                    ratings?.filter((i) => i.star === el + 1)?.length
                  }
                />
              ))}
          </div>
        </div>
        <div className="p-4 flex items-center justify-center text-sm flex-col gap-2">
          <span>Bạn có muốn đánh giá sản phẩm này không ?</span>
          <Button handleOnClick={handleVoteNow}>Gữi đánh giá</Button>
        </div>
        <div className="flex flex-col gap-4">
          {ratings?.map((el) => (
            <Comment
              key={el._id}
              star={el.star}
              updatedAt={el.updatedAt}
              comment={el.comment}
              name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default memo(ProductInfomation);
