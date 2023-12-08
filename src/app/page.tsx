"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const fields = [
  { field: "name", defaultvalue: "" },
  { field: "surname", defaultvalue: "" },
  { field: "mobile", defaultvalue: "" },
  { field: "email", defaultvalue: "" },
  { field: "mothertongue", defaultvalue: "Malayalam" },
  { field: "occupation", defaultvalue: "Student" },
  { field: "dateofbirth", defaultvalue: "" },
  { field: "placeofbirth", defaultvalue: "" },
  { field: "nationality", defaultvalue: "Indian" },
  { field: "german_level", defaultvalue: "B2" },
  { field: "institute", defaultvalue: "" },
  { field: "address", defaultvalue: "" },
];

type FieldsObject = {
  [K in (typeof fields)[number]["field"]]: string;
};

const emptyFields: FieldsObject = fields.reduce(
  (accumulator, { field, defaultvalue }) => {
    accumulator[field] = defaultvalue;
    return accumulator;
  },
  {} as FieldsObject
);

export default function Home() {
  const [state, setState] = useState<FieldsObject>(emptyFields);

  return (
    <>
      <h2 className="my-4 font-bold">Generate autofill option</h2>
      <main className="flex gap-2 flex-wrap ">
        <form
          className="flex flex-col gap-2 flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            let a = {} as FieldsObject;

            fields.forEach((element) => {
              const val = formData.get(element.field) as string;

              a = { ...a, [element.field]: val };
            });
            setState(a);

            console.log(a);
          }}
        >
          {fields.map((key, idx) => (
            <div key={idx} className="flex flex-col gap-2 max-w-4xl">
              <Label htmlFor={key.field}>{key.field}</Label>
              <Input
                id={key.field}
                name={key.field}
                defaultValue={key.defaultvalue}
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    [key.field]: e.target.value,
                  }));
                }}
              />
            </div>
          ))}
        </form>

        <div className="max-w-[50%] flex-1   flex flex-col">
          {<CopyString input={state} />}
        </div>
      </main>
    </>
  );
}

function CopyString({ input }: { input: FieldsObject }) {
  const { toast } = useToast();

  const genString = `### AUTOFILL PROFILES ###,,,,,,
Profile ID,Name,Site,Hotkey,,,
c15,"coimbatore12","","",,,
### AUTOFILL RULES ###,,,,,,
Rule ID,Type,Name,Value,Site,Mode,Profile
r86,0,"^name$","${input.name}","",1,c15
r87,0,"^surname$","${input.surname}","",1,c15
r88,0,"^mobile$","${input.mobile}","",1,c15
r89,0,"^email$","${input.email}","",1,c15
r90,0,"^mothertongue$","${input.mothertongue}","",1,c15
r91,0,"^occupation$","${input.occupation}","",1,c15
r92,0,"^dateofbirth$","${input.dateofbirth}","",1,c15
r93,0,"^placeofbirth$","${input.placeofbirth}","",1,c15
r94,0,"^nationality$","${input.nationality}","",1,c15
r95,0,"^german_level$","${input.german_level}","",1,c15
r96,0,"^institute$","${input.institute}","",1,c15
r97,0,"^address$","${input.address}","",1,c15
### AUTOFILL OPTIONS ###,,,,,,
advanced,"[]",,,,,
exceptions,"[]",,,,,
textclips,"[]",,,,,
variables,"[]",,,,,
activecat,1,,,,,
attributesoff,0,,,,,
autoimport,0,,,,,
backup,0,30,,,,
badge,1,,,,,
closeinfobar,1,1,,,,
debug,0,,,,,
delay,0,0.5,,,,
filtercats,0,,,,,
fluid,1,,,,,
hidebackup,0,,,,,
manual,0,,,,,
mask,1,,,,,
menu,1,,,,,
overwrite,1,,,,,
sitefilters,1,2,,,,
skiphidden,0,,,,,
sound,1,,,,,
vars,1,,,,,
voice,0,1,,,,`;
  return (
    <div className="flex flex-col h-full  gap-2 ">
      <Label>Copy this</Label>
      <Textarea value={genString} className="h-full w-full" />
      <Button
        onClick={() => {
          navigator.clipboard.writeText(genString);
          toast({
            title: "Successfully copied.",
            // description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Copy
      </Button>
    </div>
  );
}
