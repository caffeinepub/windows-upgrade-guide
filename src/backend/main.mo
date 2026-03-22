import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type StepStatus = {
    #notStarted;
    #inProgress;
    #completed;
  };

  type UpgradeStep = {
    id : Nat;
    title : Text;
    description : Text;
    tips : Text;
    warnings : Text;
    order : Nat;
  };

  type Article = {
    title : Text;
    excerpt : Text;
  };

  // Modules for comparison
  module UpgradeStep {
    public func compare(step1 : UpgradeStep, step2 : UpgradeStep) : Order.Order {
      Nat.compare(step1.order, step2.order);
    };
  };

  // Persistent Data
  let steps = Map.empty<Nat, UpgradeStep>();
  var stepCounter = 0;
  let userProgress = Map.empty<Principal, Map.Map<Nat, StepStatus>>();

  let articles = Map.empty<Nat, Article>();
  var articleCounter = 0;

  let systemRequirements = Map.empty<Text, Text>();

  // Upgrade Steps Management
  public shared ({ caller }) func addStep(title : Text, description : Text, tips : Text, warnings : Text, order : Nat) : async Nat {
    let step : UpgradeStep = {
      id = stepCounter;
      title;
      description;
      tips;
      warnings;
      order;
    };
    steps.add(stepCounter, step);
    stepCounter += 1;
    stepCounter - 1;
  };

  public query ({ caller }) func getAllSteps() : async [UpgradeStep] {
    steps.values().toArray().sort();
  };

  public shared ({ caller }) func updateStep(id : Nat, title : Text, description : Text, tips : Text, warnings : Text, order : Nat) : async () {
    if (not steps.containsKey(id)) { Runtime.trap("Step does not exist") };
    let step : UpgradeStep = {
      id;
      title;
      description;
      tips;
      warnings;
      order;
    };
    steps.add(id, step);
  };

  public shared ({ caller }) func deleteStep(id : Nat) : async () {
    if (not steps.containsKey(id)) { Runtime.trap("Step does not exist") };
    steps.remove(id);
  };

  // User Progress Tracking
  public shared ({ caller }) func updateProgress(stepId : Nat, status : StepStatus) : async () {
    if (not steps.containsKey(stepId)) { Runtime.trap("Step does not exist") };
    let currentProgress = switch (userProgress.get(caller)) {
      case (null) { Map.empty<Nat, StepStatus>() };
      case (?progress) { progress };
    };
    currentProgress.add(stepId, status);
    userProgress.add(caller, currentProgress);
  };

  public query ({ caller }) func getUserProgress() : async [(Nat, StepStatus)] {
    switch (userProgress.get(caller)) {
      case (null) { [] };
      case (?progress) { progress.toArray() };
    };
  };

  public shared ({ caller }) func resetProgress() : async () {
    userProgress.remove(caller);
  };

  // Featured Articles
  public shared ({ caller }) func addArticle(title : Text, excerpt : Text) : async Nat {
    let article : Article = {
      title;
      excerpt;
    };
    articles.add(articleCounter, article);
    articleCounter += 1;
    articleCounter - 1;
  };

  public query ({ caller }) func getAllArticles() : async [Article] {
    articles.values().toArray();
  };

  public shared ({ caller }) func updateArticle(id : Nat, title : Text, excerpt : Text) : async () {
    if (not articles.containsKey(id)) { Runtime.trap("Article does not exist") };
    let article : Article = {
      title;
      excerpt;
    };
    articles.add(id, article);
  };

  public shared ({ caller }) func deleteArticle(id : Nat) : async () {
    if (not articles.containsKey(id)) { Runtime.trap("Article does not exist") };
    articles.remove(id);
  };

  // System Requirements
  public shared ({ caller }) func addRequirement(key : Text, value : Text) : async () {
    systemRequirements.add(key, value);
  };

  public query ({ caller }) func getAllRequirements() : async [(Text, Text)] {
    systemRequirements.toArray();
  };

  public shared ({ caller }) func updateRequirement(key : Text, value : Text) : async () {
    if (not systemRequirements.containsKey(key)) { Runtime.trap("Requirement does not exist") };
    systemRequirements.add(key, value);
  };

  public shared ({ caller }) func deleteRequirement(key : Text) : async () {
    if (not systemRequirements.containsKey(key)) { Runtime.trap("Requirement does not exist") };
    systemRequirements.remove(key);
  };
};
