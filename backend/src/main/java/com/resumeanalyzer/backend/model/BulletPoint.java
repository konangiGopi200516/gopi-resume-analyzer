package com.resumeanalyzer.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "resume_bullets")
public class BulletPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // We'll map this to a Resume entity later. For now, a simple column.
    @Column(name = "resume_id", nullable = false)
    private Long resumeId;

    @Column(name = "original_text", columnDefinition = "TEXT", nullable = false)
    private String originalText;

    @Column(name = "enhanced_text", columnDefinition = "TEXT")
    private String enhancedText;

    @Column(name = "action_score")
    private Integer actionScore;

    @Column(name = "impact_score")
    private Integer impactScore;

    @Column(name = "ats_score")
    private Integer atsScore;
}
