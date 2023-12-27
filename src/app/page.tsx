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

export default function Home() {
  return (
    <Box className="flex h-screen items-center justify-center bg-muted">
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
                <Input id="activity-name" placeholder="Enter activity name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="members">Number of Members</Label>
                <Input
                  id="members"
                  placeholder="Enter number of members"
                  type="number"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Submit</Button>
          <Button type="submit">Download</Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
