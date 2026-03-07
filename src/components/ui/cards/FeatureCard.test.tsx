// Tests for FeatureCard component
import { render, screen } from "@testing-library/react";
import { FeatureCard } from "./FeatureCard";
import { Star } from "lucide-react";    

describe("FeatureCard", () => {
  it("renders the title and description", () => {
    render(
        <FeatureCard
          title="Test Title"
          description="Test Description"
          icon={Star}
          iconColor="text-blue-600"
        />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });   
    it("applies the correct icon color class", () => {
    render(
        <FeatureCard
          title="Test Title"
          description="Test Description"
          icon={Star}
          iconColor="text-blue-600"
        />
    );
    const iconElement = screen.getByTestId("feature-card-icon");
    expect(iconElement).toHaveClass("text-blue-600");
  });
}); 
