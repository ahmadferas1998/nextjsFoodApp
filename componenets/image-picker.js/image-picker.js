"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const [pickedimage, setpickedimage] = useState();
  const imageInputRef = useRef();
  function handlepickclick() {
    imageInputRef.current.click();
  }
  function handleimagechange(event) {
    const file = event.target.files[0];
    if (!file ) {
        setpickedimage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpickedimage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedimage && <p>No Emage Picker Yet</p>}
          {pickedimage && <Image src={pickedimage} alt="picked image" fill />}
        </div>
        <input
          onChange={handleimagechange}
          ref={imageInputRef}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
        />
        <button
          className={classes.button}
          onClick={handlepickclick}
          type="button"
        >
          Pick an image{" "}
        </button>
      </div>
    </div>
  );
}
