import { MarkdownEditor, Select, Button, InputForm, Loading } from "components";
import React, {memo, useState, useEffect, useCallback} from "react";
import {useForm} from 'react-hook-form';
import { validate, getBase64 } from "ultils/helpers";
import { toast } from "react-toastify";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { apiUpdateProduct} from "apis";
import {showModal} from 'store/app/appSlice';
import { useSelector , useDispatch} from "react-redux";

const UpdateProduct = ({editProduct, render, setEditProduct}) => {
    const { categories } = useSelector((state) => state.app);
    const dispatch = useDispatch()
    const [hoverElm, setHoverElm] = useState(null);
    const {register, handleSubmit, formState:{errors}, reset, watch} = useForm ()
    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
      });
      const [payload, setPayload] = useState({
        description: "",
      });

      useEffect(()=>{
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            color: editProduct?.color || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand?.toLowerCase() || '',
           
        })
        setPayload({description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(', ') : editProduct?.description})
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || []
        })
      },[editProduct])
      
      const [invalidFields, setInvalidFields] = useState([]);
      const changeValue = useCallback(
        (e) => {
          setPayload(e);
        },
        [payload]
      );

      const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file);
        setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
      };
    
      const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
          if (file.type !== "image/png" && file.type !== "image/jpeg") {
            toast.warning("File type not supported!");
            return;
          }
          const base64 = await getBase64(file);
          imagesPreview.push(base64);
        }
        setPreview((prev) => ({ ...prev, images: imagesPreview }));

      };
      useEffect(() => {
        if(watch('thumb') instanceof FileList && watch('thumb').length > 0 )
        handlePreviewThumb(watch("thumb")[0]);
      }, [watch("thumb"), ]);
    
      useEffect(() => {
        if(watch('images') instanceof FileList && watch('images').length > 0)
        handlePreviewImages(watch("images"));
      }, [watch("images")]);


      const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
          if (data.category)data.category = categories?.find(el => el.title === data.category)?.title;
           const finalPayload = { ...data, ...payload,};
           finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]
           const formData = new FormData();
          for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
           finalPayload.images = data.images?.length === 0 ? preview.images : data?.images
          for (let image of finalPayload.images) formData.append('images', image);
          dispatch(showModal({isShowModal: true, modalChildren: <Loading />}))
          const response = await apiUpdateProduct(formData, editProduct._id);
          dispatch(showModal({isShowModal: false, modalChildren: null}))
          console.log(response)
          if (response.success) {
            toast.success(response.mes);
            render()
            setEditProduct(null)
          } else toast.error(response.mes);
        }
      };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b  bg-gray-100 flex justify-between right-0 left-[327px] items-center fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight">CHỈNH SỬA SẢN PHẨM</h1>
        <span className="text-main hover:underline cursor-pointer" onClick={() => setEditProduct(null)}>Hủy</span>
      </div>
      <div className="p-4 ">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label="Tên sản phẩm"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Trường này không được để trống",
            }}
            fullWidth
            placeholder="Tên của sản phẩm"
          />
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label="Giá tiền"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Trường này không được để trống",
              }}
              style="flex-auto"
              placeholder="Giá tiền của sản phẩm"
              type="number"
            />

            <InputForm
              label="Số lượng"
              register={register}
              errors={errors}
              id="quantity"
              validate={{
                required: "Trường này không được để trống",
              }}
              style="flex-auto"
              placeholder="Số lượng của sản phẩm"
              type="number"
            />

            <InputForm
              label="Màu sắc"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Trường này không được để trống",
              }}
              style="flex-auto"
              placeholder="Màu sắc của sản phẩm"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <Select
              label="Danh mục"
              options={categories?.map(el => ({
                code: el.title,
                value: el.title,
              }))}
              register={register}
              id="category"
              validate={{ required: "Trường này không được để trống" }}
              style="flex-auto"
              errors={errors}
              fullWidth
            />

            <Select
              label="Thương hiệu"
              options={categories
                ?.find(el => el.title === watch("category"))
                ?.brand?.map(el => ({ code: el.toLowerCase(), value:el }))}
              register={register}
              id="brand"
              style="flex-auto"
              errors={errors}
              fullWidth
            />
          </div>
          <MarkdownEditor
            name="description"
            changeValue={changeValue}
            label="Mô tả sản phẩm :"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.description}
           
          />

          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Tải ảnh lên
            </label>
            <input
              type="file"
              id="thumb"
              {...register("thumb")}
            />
            {errors["thumb"] && (
              <small className="text-xs text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-content"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="products">
              Tải ảnh sản phẩm
            </label>
            <input
              type="file"
              id="products"
              multiple
              {...register("images")}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images?.map((el, idx) => (
                <div
                  onMouseEnter={() => setHoverElm(el.name)}
                  key={idx}
                  className="w-fit relative"
                  onMouseLeave={() => setHoverElm(null)}
                >
                  <img
                    src={el}
                    alt="product"
                    className="w-[200px] object-content"
                  />

                </div>
              ))}
            </div>
          )}
          <div className="my-6">
            <Button type="submit">Cập nhật sản phẩm</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default memo(UpdateProduct);
