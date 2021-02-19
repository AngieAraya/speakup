import React, { useEffect, useState } from "react";

export default function SelectCategories({radio, setRadio}) {
  
  return (
    <div>
      <h1>Kategori</h1>
        <label>Misshandel</label>
        <input
          type="radio"
          checked={radio === "Misshandel"}
          value="Misshandel"
          onChange={(e) => {
            setRadio(e.target.value);
          }}
        />
        <label>Rån</label>
        <input
          type="radio"
          checked={radio === "Rån"}
          value="Rån"
          onChange={(e) => {
            setRadio(e.target.value);
          }}
        />
        <label>Familj</label>
        <input
          type="radio"
          checked={radio === "Familj"}
          value="Familj"
          onChange={(e) => {
            setRadio(e.target.value);
          }}
        />
    </div>
  );
}
