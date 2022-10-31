import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SingleValue } from "react-select";

import "./style.css";
import { useFetchCities } from "../../hooks/useFetchCities";
import { CityOption, Combobox } from "../combobox/Combobox";
import { ReactComponent as Delete } from "../../assets/icons/Delete-button.svg";
import { arrayToObject } from "../../utils/array";

interface IFormInput {
  originCity: { label: string; value: string };
  destination: { label: string; value: string };
  intermediate: { label: string; value: string };
}

const todayFormated = new Date().toISOString().split("T")[0];

export const Form = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const intermediates = searchParams.get("intermediates") || "[]";
  const dateInUrl = searchParams.get("date") || "";

  const [intermediateCities, setIntermediateCities] = useState<string[]>(
    JSON.parse(intermediates)
  );

  const handleSetParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams.toString());
  };

  const intermediatesDefaults = arrayToObject(intermediateCities);

  const {
    control,
    formState: { errors, defaultValues },
    handleSubmit,
    setValue,
    resetField
  } = useForm<any>({
    defaultValues: {
      ...intermediatesDefaults,
      originCity: origin ? { label: origin, value: origin } : undefined,
      destination: destination
        ? { label: destination, value: destination }
        : undefined
    }
  });

  const [keyword, setKeyword] = useState<string>("");
  const [targetCombobox, setTargetCombobox] = useState<string>("");
  const { cities, loading } = useFetchCities(keyword);

  const handleBoxFocus = (name: string) => {
    setTargetCombobox(name);
  };

  const citiesOptions = cities.map(([name]) => ({
    value: name,
    label: name
  }));

  const handleAddCombobox = () => {
    setValue("newIntermediate", undefined, {
      shouldDirty: true
    });

    setIntermediateCities([...intermediateCities, "newIntermediate"]);
  };

  const handleAddIntermediate = (idx: number, city: string) => {
    const newIntermediate = intermediateCities;
    newIntermediate[idx] = city;

    setValue(JSON.stringify(city), city, {
      shouldValidate: true,
      shouldDirty: true
    });

    setIntermediateCities(newIntermediate);
    handleSetParams("intermediates", JSON.stringify(newIntermediate) ?? "");
  };

  const handleRemoveIntermediate = (city: string) => {
    const newIntermediate = intermediateCities.filter(
      (itm: string) => itm !== city
    );
    resetField(city);
    setIntermediateCities(newIntermediate);
    handleSetParams("intermediates", JSON.stringify(newIntermediate) ?? "");
  };

  const handleChangeData = (data: React.FormEvent<HTMLInputElement>) => {
    const date = data.currentTarget.value;
    handleSetParams("date", date);
  };

  const handleChangePassengers = (data: React.FormEvent<HTMLInputElement>) => {
    const count = data.currentTarget.value;
    handleSetParams("passengers", count);
  };

  const navigate = useNavigate();

  const deepLink = `results?${searchParams.toString()}`;

  const onSubmit: SubmitHandler<IFormInput> = () => {
    navigate(deepLink);
  };

  const shouldShowAddButton =
    intermediateCities.length === 0 ||
    intermediateCities[intermediateCities?.length - 1] !== "";

  const allErrors = Object.keys(errors).map((key) => errors[key]?.message);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="combo--form">
        <div>
          <div className="intermediate--box">
            <div className="combobox--tag">From</div>
            <div className="combo--line" />
            <Combobox
              name="originCity"
              isValid={errors.originCity?.type === "required"}
              loading={loading && targetCombobox === "origin"}
              options={citiesOptions}
              placeholder="Origin"
              control={control}
              onInputChange={setKeyword}
              requiredMsg="Origin Is Required"
              onSelect={(option: SingleValue<CityOption>) => {
                searchParams.set("origin", option?.value ?? "");
                setSearchParams(searchParams.toString());
              }}
              onFocus={() => handleBoxFocus("origin")}
            />
          </div>

          {intermediateCities.map((inter: string, idx: number) => {
            return (
              <div key={idx} className="intermediate--box">
                <div className="combobox--tag">Stop {idx + 1}</div>
                <div className="combo--line" />
                <Combobox
                  key={idx}
                  name={inter}
                  isValid={errors[inter]?.type === "required"}
                  loading={loading && targetCombobox === `intermediate${idx}`}
                  options={citiesOptions}
                  placeholder="Intermediate"
                  control={control}
                  onInputChange={setKeyword}
                  requiredMsg="Intermediate city Is Required"
                  onSelect={(option: SingleValue<CityOption>) => {
                    handleAddIntermediate(idx, option?.value ?? "");
                  }}
                  onFocus={() => handleBoxFocus(`intermediate${idx}`)}
                />

                <Delete
                  onClick={() => {
                    handleRemoveIntermediate(inter);
                  }}
                  className="remove--combobox"
                />
              </div>
            );
          })}

          <div className="intermediate--box">
            <div className="combobox--tag">To</div>
            <div className="combo--line" />
            <Combobox
              name="destination"
              isValid={errors.destination?.type === "required"}
              loading={loading && targetCombobox === "destination"}
              options={citiesOptions}
              placeholder="Destination"
              control={control}
              onInputChange={setKeyword}
              requiredMsg="Destination Is Required"
              onSelect={(option: SingleValue<CityOption>) => {
                searchParams.set("destination", option?.value ?? "");
                setSearchParams(searchParams.toString());
              }}
              onFocus={() => handleBoxFocus("destination")}
            />
          </div>

          {shouldShowAddButton && (
            <button
              type="button"
              onClick={handleAddCombobox}
              className="add--combobox"
            >
              +
            </button>
          )}
        </div>

        <div>
          <input
            className="date--picker"
            type="date"
            id="trip-date"
            name="Date"
            min={todayFormated}
            defaultValue={dateInUrl}
            required
            onChange={handleChangeData}
          />
        </div>

        <div>
          <input
            className="number--picker"
            type="number"
            min={1}
            defaultValue={1}
            onChange={handleChangePassengers}
          />
        </div>

        <input className="submit--form" type="submit" />
      </form>

      {allErrors.length > 0 && (
        <ul>
          {allErrors.map((errr) => (
            <li style={{ color: "red", fontSize: "14px" }} role="alert">
              {JSON.stringify(errr)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
