"use client";

import { useState } from "react";

import { Box } from "@radix-ui/themes";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const [activityName, setActivityName] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [members, setMembers] = useState("");
  const [name, setName] = useState("");

  const [image, setImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    if (!activityName || !activityDate || !members || !name) return;
    console.log("sending data");
    setLoading(true);
    const formData = new FormData();
    formData.append("experienceName", activityName);
    formData.append("experienceDate", activityDate);
    formData.append("numberOfPersons", members);
    formData.append("customerName", name);
    setActivityName("");
    setActivityDate("");
    setMembers("");
    setName("");
    const res = await fetch("/api/generate-ticket", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImage(url);
    }

    setLoading(false);
  };

  const downloadImage = () => {
    if (!image) return;
    // download image
    const a = document.createElement("a");
    a.href = image;
    a.download = "ticket.png";
    a.click();
  };

  const resetData = () => {
    setImage(null);
    setActivityDate("");
    setActivityName("");
    setMembers("");
    setName("");
  };

  return (
    <Box className="min-h-screen relative h-full w-full flex items-center justify-center bg-muted">
      <Box className="w-full flex flex-col md:flex-row space-y-10 md:space-y-0 py-10 items-center">
        <Box className="h-full md:w-1/2 flex items-center justify-center">
          <Card className="max-w-[400px]">
            <CardHeader>
              <CardTitle>Activity Form</CardTitle>
              <CardDescription>
                Fill out the form below to submit your activity details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="activity-name">Activity Name</Label>
                    <Input
                      id="activity-name"
                      placeholder="Enter activity name"
                      onChange={(e) => setActivityName(e.target.value)}
                      value={activityName}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      onChange={(e) => setActivityDate(e.target.value)}
                      value={activityDate}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="members">Number of Members</Label>
                    <Input
                      id="members"
                      type="number"
                      value={members}
                      onChange={(e) => setMembers(e.target.value)}
                      placeholder="Enter number of members"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="w-full flex flex-col space-y-4">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
              <Box className="w-full flex justify-between space-x-4">
                <Button
                  onClick={downloadImage}
                  disabled={image === null}
                  className="w-full"
                >
                  Download
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={resetData}
                  className="w-full"
                >
                  Reset
                </Button>
              </Box>
            </CardFooter>
          </Card>
        </Box>
        <Box className="h-full md:w-1/2 flex justify-center items-center my-auto">
          {image && <Image src={image} alt="ticket" width={300} height={300} />}
          {!image && (
            <Image
              src="/logo-primary.png"
              alt="ticket"
              width={300}
              height={300}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
