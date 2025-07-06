
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersIcon } from "lucide-react";

interface Participant {
  id: number;
  name: string;
  avatarUrl: string;
}

interface ParticipantsListProps {
  participants: Participant[];
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({ participants }) => {
  return (
    <Card className="shadow-md mb-4">
      <CardContent className="p-4">
        <h3 className="text-sm font-bold mb-2">Participants</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id} className="flex items-center gap-2 py-2">
              <Avatar>
                <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span>{participant.name}</span>
            </li>
          ))}
          <li className="flex items-center gap-2 py-2">
            <Avatar>
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <span>You</span>
          </li>
        </ul>
        <Button variant="outline" className="w-full mt-4">
          <UsersIcon className="h-4 w-4 mr-2" /> Invite More
        </Button>
      </CardContent>
    </Card>
  );
};

export default ParticipantsList;
