pragma circom 2.1.6;

include "stepState.circom";

component main { public [ bodies, address, inflightMissile ]} = StepState(6, 1250);