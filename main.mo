import Runtime "mo:core/Runtime";

actor {
  public shared ({ caller }) func invalidCallToBackend() : async () {
    Runtime.trap("Error: The BloomLoop project is a frontend-only application, fully powered by mock data. No backend computation on the Internet Computer is required. Please remove the backend canister from your project for optimal performance and security.");
  };
};
