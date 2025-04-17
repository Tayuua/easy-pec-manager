
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HoldingForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Informations du holding</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="holdingName">Nom du compte</Label>
          <Input
            id="holdingName"
            value="AudioWizard Group"
            disabled
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default HoldingForm;
