package mmi.sae_back.DTO;

import mmi.sae_back.Entity.EmargementEnum;

import java.time.LocalDate;

public class EmargementRequest {

    private Long inscriptionId;
    private LocalDate date;
    private EmargementEnum statut;

    public Long getInscriptionId() {
        return inscriptionId;
    }

    public void setInscriptionId(Long inscriptionId) {
        this.inscriptionId = inscriptionId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public EmargementEnum getStatut() {
        return statut;
    }

    public void setStatut(EmargementEnum statut) {
        this.statut = statut;
    }
}
